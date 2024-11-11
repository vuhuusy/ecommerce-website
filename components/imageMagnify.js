import React from "react";
import ReactImageMagnify from "react-image-magnify";

const ImageMagnify = ({ img }) => {
  return (
    <div>
      <div className="">
        <ReactImageMagnify
          {...{
            smallImage: {
              alt: "Wristwatch by Ted Baker London",
              isFluidWidth: true,
              src: img,
              sizes:
                "(max-width: 480px) 100vw, (max-width: 1200px) 30vw, 360px",
              srcSet: `${img} 1x, ${img}@2x.jpg 2x`,
              isHintEnabled: true,
              enlargedImagePosition: "over",
            },
            largeImage: {
              src: img,
              width: 1600,
              height: 1600,
            },
            enlargedImageContainerDimensions: {
              width: "130%",
              height: "100%",
            },
            enlargedImageContainerStyle: {
              background: "#fff",
              zIndex: 9,
              backgroundPosition: "center",
            },
          }}
        />
      </div>
    </div>
  );
};

export default ImageMagnify;

// import React from "react";

// import ImageMagnifierLens from "react-image-magnifier-lens";

// const ImageMagnify = ({ img }) => {
//   return (
//     <div>
//       <ImageMagnifierLens
//         image={{
//           src: img,
//           width: 500,
//           height: 500,
//         }}
//         zoomImage={{
//           src: img,
//           width: 1000,
//           height: 1000,
//         }}
//         cursorOffset={{ x: 50, y: -0 }}
//         size={300}
//       />
//     </div>
//   );
// };

// export default ImageMagnify;

// import React, { useState } from "react";
// import ReactImageMagnify from "react-image-magnify";

// const ImageMagnify = ({ img }) => {
//   const [isZoomed, setIsZoomed] = useState(false);

//   const handleMouseEnter = () => {
//     setIsZoomed(true);
//   };

//   const handleMouseLeave = () => {
//     setIsZoomed(false);
//   };

//   return (
//     <div
//       style={{
//         position: "relative",
//         width: "100%",
//         height: "100%",
//         cursor: "zoom-in",
//       }}
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//     >
//       <ReactImageMagnify
//         {...{
//           smallImage: {
//             alt: "Product Image",
//             src: img,
//             width: 500,
//             height: 500,
//           },
//           largeImage: {
//             src: img,
//             width: 1000,
//             height: 1000,
//           },
//           enlargedImageContainerDimensions: {
//             width: "100%",
//             height: "100%",
//           },
//           isHintEnabled: true,
//           enlargedImagePosition: "over",
//           enlargedImageContainerStyle: {
//             background: "#fff",
//             zIndex: 9,
//             display: isZoomed ? "block" : "none",
//           },
//         }}
//       />
//     </div>
//   );
// };

// export default ImageMagnify;

// import React from "react";
// import ReactImageMagnify from "react-image-magnify";

// const ImageMagnify = ({ img }) => {
//   return (
//     <div>
//       <div className="">
//         <ReactImageMagnify
//           {...{
//             smallImage: {
//               alt: "Wristwatch by Ted Baker London",
//               isFluidWidth: true,
//               src: img,
//               sizes:
//                 "(max-width: 480px) 100vw, (max-width: 1200px) 30vw, 360px",
//               srcSet: `${img} 1x, ${img}@2x.jpg 2x`,
//               isHintEnabled: true,
//               enlargedImagePosition: "over",
//             },
//             largeImage: {
//               src: img,
//               width: 1600,
//               height: 1600,
//             },
//             enlargedImageContainerDimensions: {
//               width: "100%",
//               height: "100%",
//             },
//             enlargedImageContainerStyle: { background: "#fff", zIndex: 9 },
//             enlargedImagePosition: "beside",
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default ImageMagnify;
