import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { hourSelector, minuteState } from "../../atoms";

const AtomSet = () => {
    const [minutes, setMinutes] = useRecoilState(minuteState);
    const [hours, setHours] = useRecoilState(hourSelector);
    const onMinutesChange = (event: React.FormEvent<HTMLInputElement>) => {
        setMinutes(+event.currentTarget.value);
    };
    const onHoursChange = (event: React.FormEvent<HTMLInputElement>) => {
        setHours(+event.currentTarget.value);
    };
    return (
        <div>
            <input
                value={minutes}
                onChange={(event) => onMinutesChange(event)}
                type="number"
                placeholder="Minutes"
            />
            <input
                value={hours}
                onChange={(event) => onHoursChange(event)}
                type="number"
                placeholder="Hours"
            />
        </div>
    );
};

export default AtomSet;
