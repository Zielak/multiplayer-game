// https://www.gamedev.net/articles/programming/math-and-physics/making-a-game-engine-transformations-r3566/

import Matrix from 'transformation-matrix'

const Vector2 = (x, y) => {
  return {
    x,
    y,
  }
}

const Matrix1x3 = (tx, ty) => {
  return Matrix.translate(tx, ty) Matrix.identity()
}

export default class Transform {
  constructor() {
    this.parent = null

    this.children = []

    this.localPosition = Vector2(0, 0)
    this.localRotation = 0
    this.localScale = Vector2(1, 1)

    this.isDirty = false

    this.localToWorldMatrix = Matrix.identity()
    this.isInverseDirty = false

    this.worldToLocalMatrix = Matrix.identity()
  }

  setDirty() {
    if (!this.isDirty) {
      this.isDirty = true
      this.isInverseDirty = true

      this.children.forEach(child => child.setDirty())
    }
  }

  /**
   * change the parent transform.
   * setting it to null makes the
   * transform a child of world coordinates
   * 
   * @param {Transform} newParent 
   * @memberof Transform
   */
  set parent(newParent) {
    if (this.parent !== null) {
      // remove this from the previous parent
      this.parent.removeChild(this)
    }
    this.parent = newParent
    if (this.parent) {
      this.parent.addChild(this)
    }
    // changes parents effects
    // the world position
    this.setDirty()
  }

  get parent() {
    return this.parent
  }

  /**
   * @param {Transform} child 
   * @memberof Transform
   */
  addChild(child) {
    this.children.push(child)
  }

  /**
   * @param {Transform} child 
   * @memberof Transform
   */
  removeChild(child) {
    this.children = this.children.filter(el => el !== child)
  }

  /**
   * calculates the transform matrix that converts
   * from local coordinates to the coordinate space
   * of the parent transform
   * 
   * @memberof Transform
   */
  calculateLocalToParentMatrix() {
    // Matrix.translate creates a translation matrix
    // that shifts by (localPosition.x, localPosition.y)
    // Matrix.rotate rotates by localRotation radians
    // Matrix.scale scales by a factor of (localScale.x, localScale.y)
    // These are the basic transforms that are described previously
    // in this article
    return Matrix.translate(this.localPosition.x, this.localPosition.y) *
      Matrix.rotate(this.localRotation) *
      Matrix.scale(this.localScale.x, this.localScale.y)
  }

  /**
   * @readonly
   * @return {Matrix}
   * @memberof Transform
   */
  getLocalToWorldMatrix() {
    // if the dirty flag is set, the the
    // localToWorldMatrix is out of date
    // and needs to be reclaculated
    if (this.isDirty) {
      if (this.parent === null) {
        // if the parent is null then the parent is
        // the world so the localToWorldMatrix
        // is the same as local to parent matrix
        this.localToWorldMatrix = this.calculateLocalToParentMatrix()
      } else {
        // if there is a parent, then the localToWorldMatrix
        // is calcualted recursively using the parent's localToWorldMatrix
        // concatenated with the local to parent matrix
        this.localToWorldMatrix = this.parent.getLocalToWorldMatrix() * this.calculateLocalToParentMatrix()
      }
      // clear the dirty flag since the
      // matrix is now up to date
      this.isDirty = false
    }
    return this.localToWorldMatrix
  }

  getWorldToLocalMatrix() {
    if (this.isInverseDirty) {
      // the inverse is out of date
      // so it needs to be updated
      // the worldToLocalMatrix is the inverse of
      // the localToWorldMatrix
      this.worldToLocalMatrix = Matrix.inverse(this.getLocalToWorldMatrix())
      // clear the dirty flag since the
      // matrix is now up to date
      this.isInverseDirty = false
    }
    return this.worldToLocalMatrix
  }

  /**
   * transforms a point from local coordinates to world coordinates
   * FIXME: unsure about this function
   * @param {Vector2} point 
   * @returns {Vector2}
   * @memberof Transform
   */
  transformPoint(point) {
    // matrix multiply padding the extra element with a 1
    Matrix1x3 transformResult = getLocalToWorldMatrix() * Matrix1x3(point.x, point.y, 1);
    return new Vector2(transformResult[1, 1], transformResult[1, 2], transformResult[1, 3])
  }

  /**
  // matrix multiply padding the extra element with a 0
  // notice that the worldToLocalMatrix is used here
  // and the point is multiplied as a row matrix before the
  // transform matrix. This is the proper way to transform
  // directions as described before in this article
   * 
   * @param {any} [Vector2=point] 
   * @returns 
   * @memberof Transform
   */
  transformDirection(point) {
    const transformResult = Matrix3x1(point.x, point.y, 0) * getWorldToLocalMatrix()
    return new Vector2(transformResult[1, 1], transformResult[2, 1], transformResult[3, 1])
  }

  // transforms a point from world coordinates to local coordinates
  // @returns Vector2
  inverseTransformPoint(Vector2 point) {
    // same logic as transformPoint only with the inverse matrix
    Matrix1x3 transformResult = getWorldToLocalMatrix() * Matrix1x3(point.x, point.y, 1)
    return new Vector2(transformResult[1, 1], transformResult[1, 2], transformResult[1, 3])
  }
  // transforms a direction from world coordinates to local coordinates
  // @returns Vector2
  inverseTransformDirection(Vector2 point) {
    // same logic as transformDirection only with the inverse of the
    // inverse localToWorldMatrix which is just the localToWorldMatrix
    Matrix3x1 transformResult = Matrix3x1(point.x, point.y, 0) * getLocalToWorldMatrix()
    return new Vector2(transformResult[1, 1], transformResult[2, 1], transformResult[3, 1])
  }
  // @returns Vector2
  getLocalPosition() {
    return this.localPosition
  }
  // sets the position relative to the parent
  // and marks the transform as dirty
  // @returns void
  setLocalPosition(Vector2 value) {
    localPosition = value
    // set the dirty flag since the localToWorldMatrix needs to be updated
    setDirty()
  }
  /* localRoation and localScale should also have getters and setters
  * like the local position does. Be sure to call setDirty in the
  * setters for each of them */
}

}