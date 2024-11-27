import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Modal from "react-modal";

// Modal.setAppElement("#root"); 

export default function CalendarComponent() {
    const [items, setItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [selectedDate, setSelectedDate] = useState(null);
    const [inputValue, setInputValue] = useState(""); 
    const [type, setType] = useState("");

    const handleDateClick = (info) => {
        setSelectedDate(info.dateStr); 
        setIsModalOpen(true); 
    };


    const handleAddItem = () => {
        if (!inputValue.trim()) {
            alert("Please enter a title.");
            return;
        }

        setItems([
            ...items,
            {
                title: inputValue,
                start: selectedDate,
                type, 
            },
        ]);

        // Close modal and reset states
        setIsModalOpen(false);
        setInputValue("");
        setType("");
    };

    // Close modal
    const closeModal = () => {
        setIsModalOpen(false);
        setInputValue("");
        setType("");
    };

    // Map items to include color styling
    const styledItems = items.map((item) => ({
        ...item,
        backgroundColor: item.type === "event" ? "blue" : "green",
        borderColor: item.type === "event" ? "blue" : "green",
    }));

    return (
        <div>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={styledItems}
                dateClick={handleDateClick}
            />

            {/* Modal for adding event/reminder */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Add Event or Reminder"
                className="modal-content"
                overlayClassName="modal-overlay"
            >
                <h2 className="text-xl font-bold mb-4">Add Item</h2>

                {/* Choose between Event and Reminder */}
                {!type && (
                    <div className="flex justify-around mb-4">
                        <button
                            onClick={() => setType("event")}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            Add Event
                        </button>
                        <button
                            onClick={() => setType("reminder")}
                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                        >
                            Add Reminder
                        </button>
                    </div>
                )}

                {/* Input field for title */}
                {type && (
                    <div>
                        <input
                            type="text"
                            placeholder={`Enter ${type} title`}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="w-full p-2 border rounded-md mb-4"
                        />
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddItem}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                                Add {type}
                            </button>
                        </div>
                    </div>
                )}
            </Modal>

        </div>
    );
}
