import { notification } from "antd";

const openNotification = (content: string, time: number) => {
    notification.open({
        message: content,
        duration: time, // s
        onClick: () => {
            console.log("Notification Clicked!");
        },
    });
};

export {
    openNotification,
}
