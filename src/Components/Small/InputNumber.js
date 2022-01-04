import { useState } from "react";
import "./InputNumber.scss";

export default function InputNumber({ quantily,id }) {
	const [value, setValue] = useState(quantily.count ? quantily.count : 1);
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
		quantily.count++;
		setValue(value + 1);
	};
	const handleBlur = (e) => {
		if (e.target.value === 0) {
			setValue(1);
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
