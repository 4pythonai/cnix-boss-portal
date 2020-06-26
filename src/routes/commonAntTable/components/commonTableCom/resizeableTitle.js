import React from 'react';
import { Resizable } from 'react-resizable';
<<<<<<< HEAD
const ResizeableTitle = props => {

	const { onResize, width, ...restProps } = props;

	if (!width) {
		return <th {...restProps} />;
	}

	return (
		<Resizable
			width={width}
			height={0}
			onResize={onResize}
			handle={<span
				className={`react-resizable-handle react-resizable-handle-se`}
				onClick={e => {
					e.stopPropagation();
				}}
			/>
			}
			draggableOpts={{ enableUserSelectHack: false }}
		>
			<th {...restProps} />
		</Resizable>
	);
=======

const ResizeableTitle = props => {
    const { onResize, width, ...restProps } = props;

    if (!width) {
        return <th {...restProps} />;
    }

    return (
        <Resizable
            width={width}
            height={0}
            onResize={onResize}
            draggableOpts={{ enableUserSelectHack: false }}
        >
            <th {...restProps} />
        </Resizable>
    );
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
};

export default ResizeableTitle
