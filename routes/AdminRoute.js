import SideBar from "@/components/admin/SideBar";
import { userLoggedOut } from "@/features/auth/authSlice";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const AdminRoute = (WrappedComponent) => {
  const PrivateRoute = (props) => {
    const router = useRouter();
    const { user, isLoading } = useSelector((state) => state.auth);

    const isAuthenticatedAdmin = user?.role === "admin";

    const dispatch = useDispatch();

    useEffect(() => {
      if (!isAuthenticatedAdmin && !isLoading) {
        dispatch(userLoggedOut());
        router.push("/login");
      }
    }, [isAuthenticatedAdmin, isLoading, router]);

    if (isLoading) {
      return (
        <div className="h-screen flex justify-center items-center">
          <div className="text-center text-4xl">
            <h2>Đợi chút nhé...</h2>
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className="flex">
          <div className="">
            <SideBar />
          </div>
          <div className="w-full h-full">
            <WrappedComponent {...props} />
          </div>
        </div>
      </div>
    );
  };

  return PrivateRoute;
};

export default AdminRoute;
