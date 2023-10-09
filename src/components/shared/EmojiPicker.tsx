

import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverClose,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import EmojiPicker, { Theme } from 'emoji-picker-react';
import React from "react";

export function EmojiPickerPopOver({ emoji, setEmoji }: { emoji: string, setEmoji: any }) {
    const EmojiPickerTheme = Theme.AUTO;
    const closeBtnRef = React.useRef<HTMLButtonElement | null>(null);

    const onEmojiSelect = (data: any) => {
        setEmoji(data.emoji);
        if (closeBtnRef.current) {
            closeBtnRef.current.click();
        }
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className="w-full"> {emoji !== '' ? `${emoji} Edit` : 'Pick 😃'} </Button>
            </PopoverTrigger>
            <PopoverContent side="right" className="w-80">
                <EmojiPicker
                    width={'100%'}
                    lazyLoadEmojis={false}
                    theme={EmojiPickerTheme}
                    onEmojiClick={onEmojiSelect}
                />
                <PopoverClose asChild >
                    <Button ref={closeBtnRef} variant="secondary" className="w-full hidden">Close</Button>
                </PopoverClose>
            </PopoverContent>
        </Popover>
    )
}

export default EmojiPickerPopOver
