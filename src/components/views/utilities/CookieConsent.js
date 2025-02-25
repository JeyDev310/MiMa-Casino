export function initCookieConsent() {

    const callCC = () => {

        var cc

        try {
            cc = window.initCookieConsent()
        } catch (error) { }

        if (cc) {

            cc.run({
                current_lang: 'en',
                autoclear_cookies: true,
                theme_css: 'https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@v2.8.0/dist/cookieconsent.css',
                page_scripts: true,

                gui_options: {
                    consent_modal: {
                        layout: 'cloud',
                        position: 'bottom left',
                        transition: 'slide',
                        swap_buttons: false,
                    },
                    settings_modal: {
                        layout: 'box',
                        transition: 'slide',
                    }
                },
                languages: {
                    'en': {
                        consent_modal: {
                            title: 'We use cookies! 🍪',
                            description: 'This website uses essential cookies to ensure its proper operation and tracking cookies to understand how you interact with it. The latter will be set only after consent. <button type="button" data-cc="c-settings" class="cc-link">Let me choose</button>',
                            primary_btn: {
                                text: 'Accept all',
                                role: 'accept_all',
                            },
                            secondary_btn: {
                                text: 'Reject all',
                                role: 'accept_necessary',
                            },
                        },
                        settings_modal: {
                            title: 'Cookie preferences',
                            save_settings_btn: 'Save settings',
                            accept_all_btn: 'Accept all',
                            reject_all_btn: 'Reject all',
                            close_btn_label: 'Close',
                            cookie_table_headers: [
                                { col1: 'Name' },
                                { col2: 'Domain' },
                                { col3: 'Expiration' },
                                { col4: 'Description' },
                            ],
                            blocks: [
                                {
                                    title: 'Cookie usage 📢',
                                    description: 'We use cookies to ensure the basic functionalities of the website and to enhance your online experience. You can choose for each category to opt-in/out whenever you want. For more details relative to cookies and other sensitive data, please read the full <a href="#d" class="cc-link">privacy policy</a>.',
                                }, {
                                    title: 'Strictly necessary cookies',
                                    description: 'These cookies are essential for the proper functioning of the website. Without these cookies, the website would not work properly',
                                    toggle: {
                                        value: 'necessary',
                                        enabled: true,
                                        readonly: true,
                                    },
                                }, {
                                    title: 'Performance and Analytics cookies',
                                    description: 'These cookies allow the website to remember the choices you have made in the past',
                                    toggle: {
                                        value: 'analytics',
                                        enabled: false,
                                        readonly: false
                                    },
                                    cookie_table: [
                                        {
                                            col1: '^_ga',
                                            col2: 'google.com',
                                            col3: '2 years',
                                            col4: 'description ...',
                                            is_regex: true,
                                        },
                                        {
                                            col1: '_gid',
                                            col2: 'google.com',
                                            col3: '1 day',
                                            col4: 'description ...',
                                        },
                                    ],
                                }, {
                                    title: 'Advertisement and Targeting cookies',
                                    description: 'These cookies collect information about how you use the website, which pages you visited and which links you clicked on. All of the data is anonymized and cannot be used to identify you',
                                    toggle: {
                                        value: 'targeting',
                                        enabled: false,
                                        readonly: false,
                                    },
                                }, {
                                    title: 'More information',
                                    description: 'For any queries in relation to our policy on cookies and your choices, please <a class="cc-link" href="#d">contact us</a>.',
                                },
                            ]
                        }
                    }
                }
            })
        }
    }

    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@v2.8.0/dist/cookieconsent.js'
    script.type = 'application/javascript'
    document.head.appendChild(script)

    setTimeout(() => {
        callCC()
    }, 1000)

}