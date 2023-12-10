// const reviews = [
//   {
//     id:0,
//     userName: 'Maria Zambrano',
//     rate: 3,
//     userReview: 'Perfecta, gracias.',
//     profilePic: './Img/profilePic.png',
//   },
//   {
//     id:1,
//     userName: 'Sonia Freites',
//     rate: 5,
//     userReview: 'Deliciosa, fácil de preparar!',
//     profilePic: './Img/profilePic.png',
//   }
// ];

let reviews = new Map();

const review1 = {
  id: 0,
  userName: 'Maria',
  rate: 3,
  userReview: 'Perfecta, gracias.',
  profilePic: './Img/profilePic.png'
}
let nextId = reviews.size;






export function createReview(reviewData){
   const newReview = {
    id: nextId++,
    userName: reviewData.userName,
    rate: reviewData.rate,
    userReview: reviewData.userReview,
    profilePic: './Img/profilePic.png',
   };

   this.reviews.set(newReview.id,newReview);
   return newReview;
}

export function getReviewById(reviewId){
    let review = this.reviews.get(reviewId);
    if(review){
        console.log('Receta encontrada', review);
    }
    else{ console.log('No existe la receta');}
}

export function getAllReviews(){
    console.log('Todas las reviews a continuacion: ', this.reviews);
    return this.reviews;
}

export function deleteReviewById(reviewId){
    this.reviews.delete(reviewId);
}