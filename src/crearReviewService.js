const reviews = [
  {
    id:0,
    userName: 'Maria Zambrano',
    rate: 3,
    userReview: 'Perfecta, gracias.',
    profilePic: './Img/profilePic.png',
  },
  {
    id:1,
    userName: 'Sonia Freites',
    rate: 5,
    userReview: 'Deliciosa, fácil de preparar!',
    profilePic: './Img/profilePic.png',
  }
];


let nextReview = reviews.length + 1;


export function createReview(reviewData){
   const newReview = {
    id: nextReview++,
    userName: reviewData.userName,
    rate: reviewData.rate,
    userReview: reviewData.userReview,
    profilePic: './Img/profilePic.png',
   };

   reviews.push(newReview);
   return newReview;
}

export function getReviewById(reviewId){
    const review = reviews.find(review => review.id === Number(reviewId));
    if(review){
        console.log('Receta encontrada', review);
    }
    else
    return review;
}

export function getAllReviews(){
    console.log('Todas las reviews a continuacion: ', reviews);
    return reviews;
}

export function deleteReviewById(reviewId){
    const index = reviews.findIndex(review => review.id === Number(reviewId));
    if (index !== -1){
        reviews.splice(index,1);
        return true;
    }
    return false;
    //Esta es la ramaPrueba
}