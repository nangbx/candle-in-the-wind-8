import { useEffect, useState } from "react";
import "./InputNumber.scss";
import { useDispatch } from "react-redux";
import { notifyWarning } from "../../Redux/Actions/Notify";

export default function InputNumber({ quantily, max}) {
	const [value, setValue] = useState(1);
	const dispatch = useDispatch();
	console.log(max)
	useEffect(() => {
		if(max === 0){
			setValue(0);
		}
	}, [max])
	const handleDecrement = () => {
		setValue((prev) => {
            if(value === 1){
				return prev;
			}
            quantily.count--;
			return prev - 1;
		});
	};
	const handleIncrement = () => {
		if(value < max){
			quantily.count++;
			setValue(value + 1);
		} else{
			dispatch(notifyWarning('Vượt quá số lượng cho phép'))
		}
	};
	const handleBlur = (e) => {
		if (value === 0) {
			setValue(1);
		} else if(value > max){
			dispatch(notifyWarning('Vượt quá số lượng cho phép'))
			setValue(max)
		}

    }
	const handleOnchange = (e) => {
		const reg = new RegExp("^[0-9]+$");
		if (reg.test(e.target.value)) setValue(parseInt(e.target.value));
		else if (e.target.value === "") {
			setValue(0);
		}
	};
	return (
		<div className='InputNumber'>
			<div className='input-number'>
				<button type='button' onClick={handleDecrement}>
					&minus;
				</button>
				<input value={value} onChange={handleOnchange} onBlur={handleBlur} />
				<button type='button' onClick={handleIncrement}>
					&#43;
				</button>
			</div>
		</div>
	);
}
