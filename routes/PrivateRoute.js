import ShopLoader from "@/components/loaders/ShopLoader";
import Footer from "@/shared/Footer/Footer";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const PrivateRouteHOC = (WrappedComponent) => {
  const PrivateRoute = (props) => {
    const router = useRouter();
    const { user, isLoading } = useSelector((state) => state.auth);

    const isAuthenticated = user?.email;

    useEffect(() => {
      // Redirect to login page if user is not authenticated
      if (!isAuthenticated && !isLoading) {
        router.push("/login");
      }
    }, [isAuthenticated, isLoading, router]);

    if (isLoading) {
      return <ShopLoader />;
    }

    // Render the component if user is authenticated, otherwise null
    return (
      <>
        <WrappedComponent {...props} />
        <Footer />
      </>
    );
  };

  return PrivateRoute;
};

export default PrivateRouteHOC;
