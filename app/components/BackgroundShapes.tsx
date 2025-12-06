type Shape = {
  type: "background-1" | "background-2";
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  width?: string;
  height?: string;
  className?: string;
};

type BackgroundShapesProps = {
  shapes: Shape[];
};

function Background1({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="1437"
      height="1075"
      viewBox="0 0 1437 1075"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1436.61 356.64V356.637C1436.61 159.672 1276.94 0 1079.97 0H356.635C159.673 0 0 159.672 0 356.637V356.64C0 753.35 321.597 1074.95 718.306 1074.95C1115.02 1074.95 1436.61 753.35 1436.61 356.64ZM85.417 621.696C85.645 621.765 85.82 621.896 86.05 621.961C85.943 622.267 85.9791 622.516 85.8781 622.818C85.4771 622.573 84.941 622.248 84.941 622.248C84.941 622.248 85.275 621.862 85.417 621.696Z"
        fill="#EDF2EC"
      />
    </svg>
  );
}

function Background2({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="1193"
      height="893"
      viewBox="0 0 1193 893"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.330002"
        d="M1192.21 295.967V295.965C1192.21 132.508 1059.7 0 896.242 0H295.962C132.507 0 0 132.508 0 295.965V295.967C0 625.187 266.885 892.07 596.104 892.07C925.324 892.07 1192.21 625.187 1192.21 295.967ZM70.885 515.93C71.073 515.988 71.219 516.096 71.41 516.151C71.321 516.404 71.351 516.611 71.267 516.862C70.935 516.659 70.489 516.389 70.489 516.389C70.489 516.389 70.767 516.068 70.885 515.93Z"
        fill="#508B58"
      />
    </svg>
  );
}

export default function BackgroundShapes({ shapes }: BackgroundShapesProps) {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {shapes.map((shape, index) => {
        const style: React.CSSProperties = {
          position: "absolute",
          top: shape.top,
          bottom: shape.bottom,
          left: shape.left,
          right: shape.right,
          width: shape.width,
          height: shape.height,
        };

        return (
          <div key={index} style={style}>
            {shape.type === "background-1" ? (
              <Background1
                className={`w-full h-full ${shape.className ?? ""}`}
              />
            ) : (
              <Background2
                className={`w-full h-full ${shape.className ?? ""}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
