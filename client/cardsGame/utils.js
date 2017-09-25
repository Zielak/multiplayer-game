
export const getElementById = (everything, id) => everything.find(el => el.id === id)

// TODO: test it
export const getAllParents = (everything, element) => {
  if(element.parent) {
    const found = getElementById(everything, element.parent)
    if(found){
      return [...getAllParents(everything, found)]
    } else {
      return []
    }
  } else {
    return []
  }
}
