import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// this ensures that the icon CSS is loaded immediately before attempting to render icons
import '@fortawesome/fontawesome-svg-core/styles.css'

export default props => (
  <div className="container">
    <HeaderPicture picture={props.picture} />
    <HeaderHeadline name={props.name} position={props.position} company={props.company} />
    <HeaderContacts icons={props.icons} />
  </div>
)

const HeaderPicture = (props) => (
    <div className="row mt-2 mt-sm-5">
      <div className="col"></div>
      <div className="col-4 col-sm-2">
        <img src={props.picture} alt="close-up" className="img-fluid rounded-circle" />
      </div>
      <div className="col"></div>
    </div>
)

const HeaderHeadline = (props) => (
    <div className="row mt-3">
      <div className="col"></div>
      <div className="col-8 col-sm-4">
        <h4 className="text-center">
          {props.name}
        </h4>
        <p className="text-center">
          {props.position} at {props.company}
        </p>
      </div>
      <div className="col"></div>
    </div>
)

const HeaderContacts = (props) => (
    <div className="row mt-1">
      <div className="col"></div>
      <div className="col-8 col-sm-4 text-center">
        {
          props.icons.map(
            ([icon, link], index) =>
              <a key={index} className="text-dark" href={link}>
                <FontAwesomeIcon className="mx-1" icon={icon} size="lg" />
              </a>
          )
        }
      </div>
      <div className="col"></div>
    </div>
)
