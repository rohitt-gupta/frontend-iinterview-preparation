/* eslint-disable react/prop-types */
import {
	AiOutlineAlert,
	AiOutlineCheckCircle,
	AiOutlineClose,
	AiOutlineInfoCircle,
	AiOutlineWarning,
} from "react-icons/ai";

import "./notifications.css";
import { useEffect, useRef } from "react";

const icons = {
	success: <AiOutlineCheckCircle style={{ marginRight: "4px" }} />,
	error: <AiOutlineAlert style={{ marginRight: "4px" }} />,
	info: <AiOutlineInfoCircle style={{ marginRight: "4px" }} />,
	warning: <AiOutlineWarning style={{ marginRight: "4px" }} />,
};

const animations = {
	fade: "fadeIn",
	pop: "popup",
	slide: "slideIn",
};

const Notification = ({
	type = "success",
	message,
	onClose = () => {},
	animation = "slide",
}) => {
	const notificationRef = useRef(null);
	useEffect(() => {
		if (notificationRef.current) {
			notificationRef.current.focus();
		}
	}, []);
	const ariaRole = type === "error" || type === "warning" ? "alert" : "status";
	const ariaLive =
		type === "error" || type === "warning" ? "assertive" : "polite";
	return (
		<div
			className={`notification ${type} ${animations[animation]}`}
			role={ariaRole}
			aria-live={ariaLive}
			ref={notificationRef}
		>
			{icons[type]}
			{message}
			<button onClick={onClose} className='closeBtn'>
				<AiOutlineClose />
			</button>
		</div>
	);
};

export default Notification;
