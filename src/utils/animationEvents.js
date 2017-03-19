export const whichAnimationEndEvent = () => {
  const element = document.createElement('fakeelement');
  const animations = {
    'animation':'animationend',
    'OAnimation':'oAnimationEnd',
    'MozAnimation':'animationend',
    'WebkitAnimation':'webkitAnimationEnd'
  }

  for(let animation in animations){
      if( element.style[animation] !== undefined ){
          return animations[animation];
      }
  }
}
