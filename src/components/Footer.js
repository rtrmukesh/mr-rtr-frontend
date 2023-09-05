import React, { Suspense } from "react";
//Helper
import { getCurrentYear } from "../lib/Helper";

const Footer = (props) => {
  const {
    footerColor,
    footerTextColor,
    footerCopyRightsText,
    facebookUrl,
    instagramUrl,
    linkedInUrl,
    twitterUrl,
    youtubeUrl,
    portalName,
  } = props;

  const loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  return (
    <footer
      className={`footer`}
      style={{
        backgroundColor: footerColor ? footerColor : "black",
        color: footerTextColor ? footerTextColor : "white",
      }}
    >
      <div className="container-fluid">
        <Suspense fallback={loading()}>
          <div
            className="footer p-3"
            style={{
              backgroundColor: footerColor ? footerColor : "black",
              color: footerTextColor ? footerTextColor : "white",
            }}
          >
            <div className="container-fluid">
              <div className="row">
                <div className="col mx-auto text-left col-4 text-nowrap text-sm">
                  <span>
                    &copy; {getCurrentYear()}
                    <a
                      className="ml-2"
                      target="_blank"
                      style={{
                        color: footerTextColor ? footerTextColor : "white",
                        textDecoration: "none",
                      }}
                    >
                      {footerCopyRightsText ? footerCopyRightsText : portalName}
                    </a>
                  </span>
                </div>
                <div className="col-lg-3 col-sm col-8 footer-icons">
                  <div>
                    {facebookUrl && (
                      <a href={facebookUrl} target="_blank">
                        <i
                          className="fa fa-facebook-official fa-2x pr-3"
                          aria-hidden="true"
                          style={{ color: "white" }}
                        ></i>
                      </a>
                    )}
                    {twitterUrl && (
                      <a href={twitterUrl} target="_blank">
                        <i
                          className="fa fa-twitter fa-2x pr-3"
                          aria-hidden="true"
                          style={{ color: "white" }}
                        ></i>
                      </a>
                    )}
                    {instagramUrl && (
                      <a href={instagramUrl} target="_blank">
                        <i
                          className="fa fa-instagram fa-2x pr-3"
                          aria-hidden="true"
                          style={{ color: "white" }}
                        ></i>
                      </a>
                    )}
                    {youtubeUrl && (
                      <a href={youtubeUrl} target="_blank">
                        <i
                          className="fa fa-youtube-play fa-2x pr-3"
                          aria-hidden="true"
                          style={{ color: "white" }}
                        ></i>
                      </a>
                    )}
                    {linkedInUrl && (
                      <a href={linkedInUrl} target="_blank">
                        <i
                          className="fa fa-linkedin-square fa-2x pr-3"
                          aria-hidden="true"
                          style={{ color: "white" }}
                        ></i>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Suspense>
      </div>
    </footer>
  );
};

export default Footer;
