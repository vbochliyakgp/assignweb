import { useEffect } from "react";

const MessageResponse = ({ any_message, setany_message }) => {
  useEffect(() => {
    if (any_message.message) {
      const timeout = setTimeout(() => {
        setany_message({ message: "", type: "" });
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [any_message]);

  return (
    any_message.message && (
      <p
        style={{
          textAlign: "center",
          width: "100%",
          ...(any_message.type === "success"
            ? { color: "green" }
            : any_message.type === "error"
            ? { color: "red" }
            : any_message.type === "warning"
            ? { color: "orange" }
            : {}),
        }}
      >
        {any_message.message}
      </p>
    )
  );
};

export default MessageResponse;
