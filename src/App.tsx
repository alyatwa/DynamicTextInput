import { useState } from "react";
import "./App.css";
type box = {
	id: string;
	value: string;
	isFocused: boolean;
};
const initailBoxs: box[] = [
	{ id: "xded", value: "A", isFocused: true },
	{ id: "yere", value: "B", isFocused: false },
];
function App() {
	const [boxs, setBoxes] = useState<box[]>(initailBoxs);
	const [btnText, setBtnText] = useState<string>('Print');
	const updateIndex = (id: string, value: string) => {
		setBoxes((prev) => {
			return prev.map((box) => {
				if (box.id === id) {
					return { ...box, value };
				}
				return box;
			});
		});
	};
	const setFocus = (id: string) => {
		setBoxes((prev) => {
			return prev.map((box) => {
				if (box.id === id) {
					return { ...box, isFocused: true };
				}else{
          return { ...box, isFocused: false };
        }
				return box;
			});
		});
	};
	const addNewComponent = () => {
		console.log("add new component");
		setBoxes((current) => [
			...current,
			{ id: Math.random().toString(), value: "C", isFocused: false },
		]);
	};

	return (
		<div className="flex flex-col gap-4 items-center justify-center">
			<div className="flex flex-row gap-4">
				{boxs &&
					boxs.map((box) => (
						<div className="flex flex-row gap-3 items-center justify-center" key={box.id}>
							<PlusButton
								boxId={box.id}
								state={box.isFocused}
								addNew={() => addNewComponent()}
							/>
							<input
								className="w-14 h-14 rounded-xl p-2 text-center"
								key={box.id}
								onChange={(e) => {
                  updateIndex(box.id,e.target.value.slice(-1).toLocaleUpperCase())
								}}
								value={box.value}
								onFocus={() => setFocus(box.id)}
							/>
							<PlusButton
								boxId={box.id}
								state={box.isFocused}
								addNew={() => addNewComponent()}
							/>
						</div>
					))}
			</div>

      <div className="flex">
        <button className="bg-blue-500" onClick={() => setBtnText(boxs.map(x=>x.value).join(""))}>
          {btnText}
        </button>
      </div>
		</div>
	);
}

const PlusButton = ({
	state,
	boxId,
	addNew,
}: {
	boxId: string;
	state: boolean;
	addNew: () => void;
}) => {
	return (
		<button
			key={boxId}
			onClick={addNew}
			className={`${state ? "block" : "hidden"} px-2 py-1 w-fit h-fit text-center`}
		>
			+
		</button>
	);
};

export default App;
