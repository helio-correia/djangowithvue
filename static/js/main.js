Vue.component('task-list', {
    template: '#task-list-template',

    props: ['tasks'],

    methods: {
        completeTask(task) {
            task.completed = !task.completed;
            this.$http.put(`/api/tasks/${task.id}/`, task).then((response) => {
                // success callback
            }, (response) => {
                task.completed = !task.completed
            });
        },
    }
});

Vue.component('new-task', {
    template: '#new-task-template',

    data: () => {
        return {
            task: ''
        }
    },

    methods: {
        createTask(){
            this.$http.post('/api/tasks/', {name: this.task}).then((response) => {
                this.task = '';
                this.$emit('new-task-added');
            });
        },

    },
})

new Vue({
    el: '#app',

    headers: {
        // You could also store your token in a global object,
        // and reference it here. APP.token
        'X-CSRF-TOKEN': Cookies.get('csrftoken')
    },

    data: {
        tasks: [],
    },

    methods: {
        getTasks() {
            this.$http.get('/api/tasks/?format=json').then(function(response) {
                this.tasks = response.body;
            });
        },

        updateTasks() {
            this.getTasks();
        }
    },

    created() {
        this.getTasks();
    }
});
