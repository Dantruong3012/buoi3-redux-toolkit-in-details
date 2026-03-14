import classNames from "classnames";

function Skeleton({ times }) {
  const boxes = Array(times)
    .fill(0)
    .map((_, i) => {
      // Thêm classNames và các class Tailwind vào đây
      const outerClassNames = classNames(
        "relative",
        "overflow-hidden",
        "bg-gray-200",
        "rounded",
        "mb-2.5",
        "h-10", // Chiều cao của khối (bạn có thể đổi thành h-8, h-12...)
        "w-full", // Chiều rộng chiếm hết không gian
        "animate-pulse", // Đây chính là class tạo hiệu ứng nhịp thở/tải trang
      );

      return <div key={i} className={outerClassNames} />;
    });

  return boxes;
}

export default Skeleton;
