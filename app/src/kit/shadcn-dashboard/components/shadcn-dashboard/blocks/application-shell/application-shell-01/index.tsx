"use client";
import { Card } from "../../../../../../shadcn/ui/card";
import { useState } from "react";
import { Sheet, SheetClose, SheetContent } from "../../../../../../shadcn/ui/sheet";
import ChatListing from "./chat-listing";
import ChatContent from "./chat-content";
import ChatMsgSent from "./chat-msgsent";
import { Separator } from "../../../../../../shadcn/ui/separator";
import { X } from 'lucide-react';
import { chatData as initialChatData } from "./data";
import { Chat, CURRENT_USER_ID } from "./types";

const ApplicationShell01 = () => {
    const [isOpenChat, setIsOpenChat] = useState(false);

    const [chatData, setChatData] = useState<Chat[]>(initialChatData);
    const [chatSearch, setChatSearch] = useState("");
    const [activeChatId, setActiveChatId] = useState<number | null>(
        initialChatData[0]?.id ?? null
    );

    const selectedChat = chatData.find((chat) => chat.id === activeChatId) ?? null;

    const handleSelectChat = (chat: Chat) => {
        setActiveChatId(chat.id);
        setIsOpenChat(false);
    };

    const handleSendMessage = (chatId: number, message: string) => {
        setChatData((prev) =>
            prev.map((chat) =>
                chat.id === chatId
                    ? {
                        ...chat,
                        messages: [
                            ...chat.messages,
                            {
                                id: chat.messages.length + 1,
                                senderId: CURRENT_USER_ID,
                                msg: message,
                                type: "text" as const,
                                createdAt: new Date(),
                                attachment: [],
                            },
                        ],
                    }
                    : chat
            )
        );
    };

    return (
        <Card className="py-0 overflow-hidden w-full">
            <div className="flex h-[calc(100vh_-_100px)]">
                {/* ------------------------------------------- */}
                {/* Left Part */}
                {/* ------------------------------------------- */}
                <Sheet
                    open={isOpenChat}
                    onOpenChange={(
                        open: boolean | ((prevState: boolean) => boolean)
                    ) => setIsOpenChat(open)}
                >
                    <SheetContent
                        side="left"
                        showCloseButton={false}
                        className="max-w-[320px] sm:max-w-[320px] w-full h-full lg:z-0 lg:hidden block"
                    >
                        <SheetClose className="absolute top-0 end-0 p-2 h-9 w-9 flex justify-center items-center hover:bg-primary/5 hover:text-primary cursor-pointer bg-transparent y rounded-lg">
                            <X size={20} />
                        </SheetClose>

                        <ChatListing
                            chatData={chatData}
                            chatSearch={chatSearch}
                            setChatSearch={setChatSearch}
                            activeChatId={activeChatId}
                            onSelectChat={handleSelectChat}
                        />
                    </SheetContent>
                </Sheet>
                <div className="max-w-[300px] sm:max-w-[350px] h-full lg:block hidden border-e">
                    <ChatListing
                        chatData={chatData}
                        chatSearch={chatSearch}
                        setChatSearch={setChatSearch}
                        activeChatId={activeChatId}
                        onSelectChat={handleSelectChat}
                    />
                </div>
                {/* ------------------------------------------- */}
                {/* Right part */}
                {/* ------------------------------------------- */}
                <div className="grow w-[70%] min-w-0 flex flex-col h-full">
                    <div className="flex-1 min-h-0 overflow-hidden">
                        <ChatContent
                            selectedChat={selectedChat}
                            onClickMobile={() => setIsOpenChat(true)}
                        />
                    </div>
                    <div className="shrink-0">
                        <Separator />
                        <ChatMsgSent
                            selectedChat={selectedChat}
                            onSendMessage={handleSendMessage}
                        />
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default ApplicationShell01
