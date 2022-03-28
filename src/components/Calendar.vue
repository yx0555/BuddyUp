<template>
<Calendar />
<DatePicker v-model="date" />  
</template>

<script>
import { Calendar } from 'v-calendar';
import 'v-calendar/dist/style.css';

export default {
    components: {
        Calendar,
        // DatePicker,
    },
    data() {
        return {
        date: new Date(),
        };
    },
}
</script>
