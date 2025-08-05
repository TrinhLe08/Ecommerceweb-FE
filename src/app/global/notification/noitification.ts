import { notification } from "antd";

const openNotification = (
    content: string,
    time: number,
    type: "success" | "error" | "info" | "warning"
) => {
    notification[type]({
        message: content,
        duration: time,
        onClick: () => {
            console.log("Notification Clicked!");
        },
    });
};
export {
    openNotification,
}
