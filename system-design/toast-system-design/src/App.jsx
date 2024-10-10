import "./App.css";
import useNotification from "./hooks/use-notification";
function App() {
	const { triggerNotification, NotificationBanner } =
		useNotification("top-left");

	return (
		<div>
			Hello World
			<button
				onClick={() => {
					triggerNotification({
						duration: 2000,
						message: "Notification successfully popped!",
						type: "success",
						animation: "pop",
					});
				}}
			>
				Success Toast
			</button>
			<button
				onClick={() => {
					triggerNotification({
						duration: 8000,
						message: "toast with info!",
						type: "info",
					});
				}}
			>
				Info Toast
			</button>
			<button
				onClick={() => {
					triggerNotification({
						duration: 8000,
						message: "Toast with warning!",
						type: "warning",
					});
				}}
			>
				Warning Toast
			</button>
			<button
				onClick={() => {
					triggerNotification({
						duration: 8000,
						message: "Toast with error!",
						type: "error",
					});
				}}
			>
				Error Toast
			</button>
			<NotificationBanner />
		</div>
	);
}

export default App;
