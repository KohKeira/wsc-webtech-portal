import {
    forwardRef,
    TextareaHTMLAttributes,
    useEffect,
    useImperativeHandle,
    useRef,
} from 'react';

export default forwardRef(function TextArea(
    {
        className = '',
        isFocused = false,

        ...props
    }: TextareaHTMLAttributes<HTMLTextAreaElement> & {
        isFocused?: boolean;
    },
    ref,
) {
    const internalRef = useRef<HTMLTextAreaElement>(null);

    useImperativeHandle(ref, () => internalRef.current);

    useEffect(() => {
        if (isFocused && internalRef.current) {
            internalRef.current.focus();
        }
    }, [isFocused]);

    return (
        <textarea
            {...props}
            ref={internalRef}
            className={
                'mt-1 block w-full rounded-md border-gray-300 p-2.5 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:focus:border-blue-500 ' +
                className
            }
        />
    );
});
