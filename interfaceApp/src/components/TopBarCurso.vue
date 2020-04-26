<template>
    <vue-navigation-bar :options="options" />
</template>

<script>
    export default {
        data () {
            return {
                options: [
                        {
                            type: 'link',
                            text: 'Why Dunder Mifflin',
                            path: '/why',
                            
                        },
                        {
                            type: 'link',
                            text: 'Contact',
                            path: '/contact',
                        },
                        {
                            type: 'link',
                            text: 'Pricing',
                            path: '/pricing',
                        }
                ],
                navbarData: {
                    elementId: 'main-navbar',
                    isUsingVueRouter: false,
                    mobileBreakpoint: 992,
                    brandImagePath: '/',
                    brandImageAltText: 'vue-navigation-bar',
                    collapseButtonStyle: 'dark',
                    ariaLabelMainNav: 'Main Navigation',
                    options: [
                        {
                            type: 'link',
                            text: 'Why Dunder Mifflin',
                            path: '/why',
                            
                        },
                        {
                            type: 'link',
                            text: 'Contact',
                            path: '/contact',
                        },
                        {
                            type: 'link',
                            text: 'Pricing',
                            path: '/pricing',
                        },
                    ],
                }
            }
        }
    }
</script>

<style lang="scss">
    .vnb {
        .button-red {
            background: #FF3B30;

            &:hover {
                background: darken(#FF3B30, 10%);
            }
        }
    }
</style>