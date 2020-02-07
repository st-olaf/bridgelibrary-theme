/* global QwidgetBootStrap */
import React from "react";

class SupportWidget extends React.Component {
    render() {
        if ("stolaf.edu" === this.props.institution) {
            window.__lc = window.__lc || {};
            window.__lc.license = 7639251;

            (function() {
                var lc = document.createElement("script");
                lc.type = "text/javascript";
                lc.async = true;
                lc.src = "https://cdn.livechatinc.com/tracking.js";
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(lc, s);
            })();

            return null;
        } else if ("carleton.edu" === this.props.institution) {
            // Carleton.
            (function() {
                var qp = document.createElement("script");
                qp.type = "text/javascript";
                qp.async = true;
                qp.src =
                    "https://www.questionpoint.org/crs/qwidgetV4/js/qwidget.bootstrapnj.js?langcode=1&instid=13819&skin=gray&size=fill&customSkin=https%3A%2F%2Fwww.carleton.edu%2Fdepartments%2FLIBR%2FQuestionPoint%2Fcss%2Fcustom.css%0A";
                qp.id = "questionpoint.bootstrap1";
                qp.qwidgetno = "1";
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(qp, s);

                qp.onload = () => {
                    if ("undefined" !== typeof QwidgetBootStrap) {
                        QwidgetBootStrap.embed();
                    }
                };
            })();

            return (
                <div>
                    <h2>Carleton Support</h2>
                    <div style={{ height: "350px" }}>
                        <div id="questionpoint.chatwidget1" qwidgetno="1"></div>
                    </div>
                    <p>
                        When Carleton librarians are not available, librarians
                        from other institutions will be available to help you
                        24/7.
                    </p>
                </div>
            );
        }

        return null;
    }
}

export default SupportWidget;
