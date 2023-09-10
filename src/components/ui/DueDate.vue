<template>
  <div>
    <div class="flex flex-col leading-3 text-center cursor-default">
      <div
        class="bg-sky-600 text-white px-[3px] font-light rounded-t-sm border-sky-600 pb-0.5"
      >
        {{ shortenedMonth }}
      </div>
      <div
        class="px-0.5 text-[10px] border-b border-x border-gray-200 rounded-b-sm font-semibold"
      >
        {{ dayInMonth }}
      </div>
    </div>
  </div>
</template>

<script>
import { format, getYear, parseISO } from "date-fns";
import { enUS } from "date-fns/locale";

export default {
  props: ["todo"],
  setup(props) {
    const date = parseISO(props.todo.date);
    const dayInWeek = format(date, "iiii", { locale: enUS });
    const dayInMonth = format(date, "d", { locale: enUS });
    const year = getYear(date);
    const shortenedMonth = format(date, "MMM", { locale: enUS });

    const fullDate = `
  ${dayInWeek}, ${dayInMonth} ${format(date, "MMMM", {
      locale: enUS,
    })}, ${year} at ${props.todo.time}
`;

    return {
      dayInWeek,
      dayInMonth,
      year,
      shortenedMonth,
      fullDate,
    };
  },
};
</script>
