import { Link } from 'react-router-dom'
import videoBG from '../../assets/vids/bg.mp4'

import './sections.css'

const MainSection = () => {
  return (
    <div className='main-section-container'>
        <div className='video-background'>
            <video autoPlay loop muted className='video' style={{ position: 'absolute', left: 0, top: 180, width: '100%', height: 400, aspectRatio: 16/9, objectFit: 'cover', zIndex: -1 }}>
                <source src={videoBG} type="video/mp4" />
            </video>
        </div>
        <div className='context-info'>
            <h2 className="context-title">Main Section</h2>
            <p className="context">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                Quia similique cum dolorem voluptatem natus doloremque 
                iusto at velit unde. Dignissimos, hic minima quam aliquid 
                nam veniam impedit sapiente non ipsa, odit consequatur. 
                Ad autem numquam explicabo totam at dignissimos ipsam fugit 
                laboriosam harum nisi, possimus ducimus? Architecto nulla 
                voluptatibus corporis sunt unde praesentium eum aspernatur 
                obcaecati molestias totam cupiditate voluptates atque dolore 
                harum, facere velit labore?
            </p>
        </div>
    </div>
  )
}

export default MainSection
