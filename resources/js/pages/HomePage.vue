<template>
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card card-default">
                <div class="card-header">Home Component</div>
                <div class="card-body">
                    I'm the Home Component.
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "HomePage",
        created() {
            console.log('Home Component created.')
        },
        mounted() {
            console.log('Home Component mounted.')
        },
    }
</script>
