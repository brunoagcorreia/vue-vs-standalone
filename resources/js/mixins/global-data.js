export const myMixin = {
    data() {
        return {
            authors: [],
        };
    },
    created: function() {
        this.getAuthors();
    },
    methods: {
        getAuthors: function() {
            let url = `/api/author`;
            let token = localStorage.getItem('token');
            let headers = {
                "Authorization": "Bearer " + token,
            };
            this.axios
                .get(url, { params:{}, headers: headers })
                .then((response) => {
                    this.authors = response.data;
                })
                .catch(err => {
                    console.error(url + ": " + err);
                });
        }
    }
};
