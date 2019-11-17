<template>
    <div>
        <div class="row">
            <div class="col">
                <h3>Videos</h3>
            </div>
            <div class="col align-middle">
                <router-link :to="{ name: 'create' }" class="btn btn-primary float-right">Create Video</router-link>
            </div>
        </div>

        <table class="table table-hover">
            <thead>
            <tr>
                <th>ID</th>
                <th>Author</th>
                <th>Titel</th>
                <th>Preis</th>
                <th class="text-center" colspan="3"><br></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in movies" :key="item.id" :v-model="movies">
                <td>{{ item.id }}</td>
                <td>{{ item.author.fullname }}</td>
                <td>{{ item.title }}</td>
                <td>{{ item.price }}</td>
                <td><router-link :to="{name: 'show', params: { movie: item }}" class="btn btn-primary">Show</router-link></td>
                <td><router-link :to="{name: 'edit', params: { movie: item }}" class="btn btn-primary">Edit</router-link></td>
                <td><button class="btn btn-danger softdel" @click.prevent="deleteItem(item.id)">Delete</button></td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name: "IndexPage",
        data() {
            return {
                movies: []
            }
        },
        mounted () {
            this.getList();
        },
        methods: {
            getList() {
                let url = `/api/movie`;
                let token = localStorage.getItem('token');
                let headers = {
                    "Authorization": "Bearer " + token,
                };
                this.axios
                    .get(url, { params:{}, headers: headers })
                    .then((response) => {
                        console.info('response');
                        console.info(response);
                        this.movies = response.data;
                    })
                    .catch(err => {
                        console.error(url + ": " + err);
                    });
            },
            deleteItem(id) {
                if( confirm('Daten mit der ID: ' + id + ' wirklich löschen?') ) {
                    let url = `/api/movie/${id}`;
                    this.axios
                        .delete(url)
                        .then(response => {
                            this.movies.map((movie, index) => {
                                if (id == movie.id) {
                                    console.info("delete: " + movie.title);
                                    return this.movies.splice(index, 1);
                                }
                            })
                        }).catch(err => {
                            console.error(err)
                        });
                }
            }
        }
    }
</script>
