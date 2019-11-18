
<template>
    <div class="container">
        <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
            <span class="navbar-brand">
            </span>

            <button class="navbar-toggler float-right" type="button" data-toggle="collapse" data-target="#topNavbar" aria-controls="topNavbar" aria-expanded="false" aria-label="Toggle Navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="topNavbar">
                <ul class="navbar-nav" v-if="$store.getters.auth">
                    <li class="nav-item">
                        <router-link to="/" class="nav-link">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/movie/list" class="nav-link">Movies</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/movie/create" class="nav-link">Create Movie</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/logout" class="nav-link">Logout</router-link>
                    </li>
                    <li class="nav-item">
                        <span class="nav-link text-info" v-if="$store.getters.user" :v-model="$store.getters.time_remain">{{ $store.getters.user.name }} {{ $store.getters.timeRemain }} sec</span>
                    </li>
                </ul>

                <ul class="navbar-nav" v-if="!$store.getters.auth">
                    <li class="nav-item">
                        <router-link to="/" class="nav-link">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/login" class="nav-link">Login</router-link>
                    </li>
                </ul>
            </div>
        </nav>
        <br />
        <transition name="fade">
            <router-view></router-view>
        </transition>
        <NotAuthorizedComponent v-if="$store.getters.isNotLoggedIn"></NotAuthorizedComponent>
    </div>
</template>

<style>
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
    }
    .fade-enter, .fade-leave-active {
        opacity: 0
    }
</style>
