<template>
    <div>
        <h1>new Movie</h1>
        <form @submit.prevent="create">

            <div class="row">
                <div class="col-md-12">
                    <div class="form-group">
                        <label>Author:</label>
                        <select id="author_id" name="author_id" class="form-control" v-model="movie.author_id" :required="true">
                            <option value="">choose author ...</option>
                            <option
                                v-for="(val) in authors"
                                :value="val.id"
                            >{{ val.fullname }}</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-12">
                    <div class="form-group">
                        <label>Title:</label>
                        <input id="title" name="title" type="text" class="form-control" v-model="movie.title"/>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-12">
                    <div class="form-group">
                        <label>Price:</label>
                        <input id="price" name="price" type="text" class="form-control" v-model="movie.price"/>
                    </div>
                </div>
            </div>

            <br />
            <div class="form-group">
                <button class="btn btn-primary">Create</button>
            </div>
        </form>
    </div>
</template>

<script>
    import {myMixin} from "../mixins/global-data";

    export default {
        name: 'CreatePage',
        mixins: [myMixin],
        data(){
            return {
                movie:{},
                authors: [],
            }
        },
        mounted() {
            console.info(this.authors)
        },
        methods: {
            create() {
                let token = localStorage.getItem('token');
                let headers = {
                    "Authorization": "Bearer " + token,
                };
                let uri = `/api/movie`;
                this.axios.post(uri, this.movie, { params:{}, headers: headers })
                    .then((response) => {
                        this.$router.push({name: 'movies'});
                    }).catch(err => {
                        console.error(err)
                    });
            },
        }
    }
</script>
