import CustomerLayout from "@/layouts/customerLayout";

import { RiFacebookFill } from "react-icons/ri";
import {
  AiOutlineTwitter,
  AiFillLinkedin,
  AiFillYoutube,
} from "react-icons/ai";
import CommonLayout from "@/layouts/commonLayout";

const ContactUsPage = () => {
  return (
    <div className="mt-16 lg:mt-0">
      <div className="flex justify-center lg:h-[500px] bg-[url('https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fabout-gallery-slider-1.6ab7e25e.jpg&w=1080&q=75')] bg-cover bg-no-repeat items-center">
        <div className="container mx-auto px-3">
          <div className="py-20 text-white text-center">
            <p>SOMETHGING SWEET JUST FOR YOU!</p>
            <h1 className="text-3xl lg:text-6xl font-bold">
              Còn phân vân? <br /> Daily Sweets sẽ giúp bạn!
            </h1>
          </div>
        </div>
      </div>

      <CommonLayout>
        <div className="bg-white">
          <div className="max-w-screen-2xl mx-auto lg:py-20 py-10 px-4 sm:px-10">
            <div class="grid md:grid-cols-2 gap-6 lg:grid-cols-3 xl:gap-8 font-primary">
              <div className="border p-10 rounded-lg text-center">
                <span className="flex justify-center text-4xl text-emerald-500 mb-4">
                  <img
                    src="https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcontact-icon-1.b3ea7c8a.png&w=96&q=75"
                    alt=""
                  />
                </span>
                <h5 className="text-xl mb-2 font-bold">Qua Email</h5>
                <p className="mb-0 text-base opacity-90 leading-7">
                  <button className="text-2xl hover:text-red-600 duration-300 font-semibold">
                    cskh@dailysweets.com
                  </button>
                  <br />
                  Chưa biết viết gì.
                </p>
              </div>
              <div className="border p-10 rounded-lg text-center">
                <span className="flex justify-center text-4xl text-emerald-500 mb-4">
                  <img
                    src="https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcontact-icon-3.9effa1ee.png&w=64&q=75"
                    alt=""
                  />
                </span>
                <h5 className="text-xl mb-2 font-bold">Gọi Điện</h5>
                <p className="mb-0 text-base opacity-90 leading-7">
                  <button className="text-2xl hover:text-red-600 duration-300 font-semibold">
                    +84 328 139 753
                  </button>{" "}
                  <br />
                  Chưa biết viết gì.
                </p>
              </div>
              <div className="border p-10 rounded-lg text-center">
                <span className="flex justify-center text-4xl text-emerald-500 mb-4">
                  <img
                    src="https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcontact-icon-2.a19f544a.png&w=128&q=75"
                    alt=""
                  />
                </span>
                <h5 className="text-xl mb-2 font-bold">Qua Mạng Xã Hội</h5>
                <p className="mb-0 text-base opacity-90 leading-7">
                  Theo dõi trên mạng xã hội.
                </p>

                <div className=" flex justify-center items-center mt-2">
                  <button className="w-8 h-8 hover:text-red-600 duration-300 flex justify-center items-center ">
                    <RiFacebookFill size={20} />
                  </button>

                  {/* <button className="w-8 h-8 hover:text-red-600 duration-300 ml-1 flex justify-center items-center ">
                    <AiOutlineTwitter size={20} />
                  </button>

                  <button className="w-8 h-8 hover:text-red-600 duration-300 ml-1 flex justify-center items-center ">
                    <AiFillLinkedin size={20} />
                  </button>

                  <button className="w-8 h-8 hover:text-red-600 duration-300 ml-1 flex justify-center items-center ">
                    <AiFillYoutube size={20} />
                  </button> */}
                </div>
              </div>
            </div>

            <div className="px-0 pt-24 mx-auto items-center flex flex-col md:flex-row w-full justify-between">
              <div className="hidden md:w-full lg:w-5/12 lg:flex flex-col h-full">
                <img
                  className="w-full h-full"
                  src="https://kachabazar-store.vercel.app/_next/image?url=%2Fcontact-us.png&w=1080&q=75"
                  alt=""
                />
              </div>
              <div className="px-0 pb-2 lg:w-5/12 flex flex-col md:flex-row">
                <form className="w-full mx-auto flex flex-col justify-center">
                  <div className="mb-12">
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold font-primary mb-3">
                      Gửi cho Daily Sweets câu hỏi của bạn!
                    </h3>
                    <p className="flex flex-col space-y-5">
                      Mọi khúc mắc của bạn sẽ được giải đáp.
                    </p>
                  </div>
                  <div className="flex flex-col space-y-5">
                    <div className="flex flex-col md:flex-row space-y-5 md:space-y-0">
                      <div className="w-full md:w-1/2">
                        <label className="block text-gray-500 font-medium text-sm leading-none mb-2">
                          Tên của bạn
                        </label>
                        <div className="relative">
                          <input
                            name="name"
                            type="text"
                            placeholder="Nhập tên của bạn"
                            className="py-2 px-4 md:px-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-emerald-500 h-11 md:h-12"
                          />
                        </div>
                      </div>
                      <div className="w-full md:w-1/2 md:ml-2.5 lg:ml-5 mt-2 md:mt-0">
                        <label className="block text-gray-500 font-medium text-sm leading-none mb-2">
                          Email
                        </label>
                        <div className="relative">
                          <input
                            name="email"
                            type="email"
                            placeholder="Nhập email của bạn"
                            className="py-2 px-4 md:px-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-emerald-500 h-11 md:h-12"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="relative">
                      <label className="block text-gray-500 font-medium text-sm leading-none mb-2">
                        Về chủ đề
                      </label>
                      <div className="relative">
                        <input
                          name="subject"
                          type="text"
                          placeholder="Chủ đề bạn thắc mắc"
                          className="py-2 px-4 md:px-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-emerald-500 h-11 md:h-12"
                        />
                      </div>
                    </div>
                    <div className="relative mb-4">
                      <label className="block text-gray-500 font-medium text-sm leading-none mb-2">
                        Nội dung
                      </label>
                      <textarea
                        name="message"
                        rows="4"
                        placeholder="Chi tiết nội dung thắc mắc"
                        className="px-4 py-3 flex items-center w-full rounded appearance-none opacity-75 transition duration-300 ease-in-out text-sm focus:ring-0 bg-white border border-gray-300 focus:shadow-none focus:outline-none focus:border-gray-500 placeholder-body"
                      ></textarea>
                    </div>
                    <div className="relative">
                      <button className="md:text-sm leading-4 inline-flex items-center cursor-poEnter transition ease-in-out duration-300 font-semibold text-center justify-center border-0 border-transparent rounded-md placeholder-white focus-visible:outline-none focus:outline-none bg-red-500 text-white px-5 md:px-6 lg:px-8 py-3 md:py-3.5 lg:py-3 hover:text-white hover:bg-red-600 h-12 mt-1 text-sm lg:text-base w-full sm:w-auto">
                        Gửi
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </CommonLayout>
    </div>
  );
};

ContactUsPage.getLayout = (page) => {
  return <CustomerLayout>{page}</CustomerLayout>;
};

export default ContactUsPage;
