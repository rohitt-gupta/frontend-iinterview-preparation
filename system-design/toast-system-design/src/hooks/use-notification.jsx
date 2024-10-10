import { useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import Notification from "./../components/notifications";

const useNotification = (position = "bottom-right") => {
	const [notifications, setNotifications] = useState([]);

	// let timer;

	const triggerNotification = useCallback((notificationProps) => {
		// clearTimeout(timer); // wont be needing it now in multiple toasts
		const toastId = uuidv4();
		setNotifications((prevNotifications) => [
			...prevNotifications,
			{ id: toastId, ...notificationProps },
		]);

		// Clear the notification after its duration and remove timer
		setTimeout(() => {
			setNotifications((prevNotifications) =>
				prevNotifications.filter((n) => n.id !== toastId)
			);
		}, notificationProps.duration);
	}, []);

	const handleNotificationClose = (index) => {
		setNotifications((prevNotifications) => {
			// can also use id to filter but slice is better for perf
			const updatedNotifications = [...prevNotifications];
			updatedNotifications.splice(index, 1);
			return updatedNotifications;
		});
	};

	const NotificationComponent = (
		<div
			className={`notification-container ${position} ${position.split("-")[0]}`}
		>
			{notifications.map((notification, index) => (
				<Notification
					key={notification.id}
					onClose={() => handleNotificationClose(index)}
					{...notification}
				/>
			))}
		</div>
	);

	return { NotificationComponent, triggerNotification };
};

export default useNotification;
