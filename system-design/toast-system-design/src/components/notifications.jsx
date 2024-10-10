/* eslint-disable react/prop-types */
import {
	AiOutlineAlert,
	AiOutlineCheckCircle,
	AiOutlineClose,
	AiOutlineInfoCircle,
	AiOutlineWarning,
} from "react-icons/ai";

import "./notifications.css";

const icons = {
	success: <AiOutlineCheckCircle />,
	error: <AiOutlineAlert />,
	info: <AiOutlineInfoCircle />,
	warning: <AiOutlineWarning />,
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
	return (
		<div className={`notification ${type} ${animations[animation]}`}>
			{icons[type]}
			{message}
			<AiOutlineClose onClick={onClose} className='close-icon' />
		</div>
	);
};

export default Notification;
