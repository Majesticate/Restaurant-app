const FloatingItems = () => {
  const floatingImages = [
    {
      src: "/images/green1.png",
      top: "8%",
      left: "-1%",
      animation: "animate-floating1",
      size: "w-30 sm:w-100", // Bigger
    },
    {
      src: "/images/green2.png",
      top: "18%",
      right: "10%",
      animation: "animate-floating2",
      size: "w-20 sm:w-50", // Normal
      hiddenOnMobile: true, // Add this property
    },
    // {
    //   src: "/images/tomatoes.png",
    //   bottom: "15%",
    //   left: "10%",
    //   animation: "animate-floating3",
    //   size: "w-48 sm:w-64", // Bigger
    //   hiddenOnMobile: true, // Add this property
    // },
    {
      src: "/images/tomatoes.png",
      top: "25%",
      left: "7%",
      animation: "animate-floating4",
      size: "w-24 sm:w-36", // Normal
      hiddenOnMobile: true, // Add this property
    },
    {
      src: "/images/pepper.png",
      bottom: "8%",
      right: "12%",
      animation: "animate-floating5",
      size: "w-32 sm:w-40",
      hiddenOnMobile: true, // Add this property
    },
    {
      src: "/images/mushroom.png",
      top: "51.5%",
      left: "10%",
      animation: "animate-floating6",
      size: "w-28 sm:w-40", // Normal
    },
    {
      src: "/images/bowl.png",
      bottom: "35.5%",
      left: "3%",
      animation: "animate-floating7",
      size: "w-18 sm:w-40", // **Biggest**
    },
  ];

  return (
    <>
      {floatingImages.map((item, index) => (
        <img
          key={index}
          src={item.src}
          alt={`Floating item ${index}`}
          className={`absolute opacity-80 ${item.animation} ${item.size} ${
            item.hiddenOnMobile ? "hidden sm:block" : ""
          }`}
          style={{
            top: item.top,
            left: item.left,
            right: item.right,
            bottom: item.bottom,
          }}
        />
      ))}
    </>
  );
};

export default FloatingItems;
