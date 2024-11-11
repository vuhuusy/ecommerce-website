import { store } from "@/app/store";
import Header from "@/shared/Header/Header";
import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(
    <Provider store={store}>
      <Header />
      <Component {...pageProps} />
      <Toaster position="top-center" />
    </Provider>
  );
}
