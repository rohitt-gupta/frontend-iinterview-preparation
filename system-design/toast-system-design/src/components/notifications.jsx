/* eslint-disable react/prop-types */
import {
	AiOutlineAlert,
	AiOutlineCheckCircle,
	AiOutlineCloseCircle,
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

const Notification = ({ type = "success", message, onClose = () => {} }) => {
	return (
		<div className={`notifications ${type}`}>
			{icons[type]}
			{message}
			<AiOutlineCloseCircle onClick={onClose} className='close-icon' />
		</div>
	);
};

export default Notification;
