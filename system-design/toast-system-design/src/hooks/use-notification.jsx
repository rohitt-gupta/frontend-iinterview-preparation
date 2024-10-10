import { useCallback, useState } from "react";
import Notification from "../components/notifications";

const useNotification = (position = "top-right") => {
	const [notificationProps, setNotificationProps] = useState(null);

	let timer;

	const triggerNotification = useCallback((options) => {
		console.log("handle", options.type);
		clearTimeout(timer);
		setNotificationProps(options);
		timer = setTimeout(() => {
			setNotificationProps(null);
		}, options.duration);
		console.log("handle", options.type);
	}, []);

	const NotificationBanner = () =>
		notificationProps ? (
			<div className={`${position}`}>
				<Notification {...notificationProps} />
			</div>
		) : null;

	return { NotificationBanner, triggerNotification };
};

export default useNotification;
