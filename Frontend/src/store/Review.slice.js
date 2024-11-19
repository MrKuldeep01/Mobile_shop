import {createSlice} from '@reduxjs/toolkit';



const reviewSlice = createSlice({
    name: 'review',
    initialState: {
        reviews: []
    },
    reducers: {
        setReviews: (state, action) => {
            state.reviews = action.payload;
        },
        addReview: (state, action) => {
            // Assuming action.payload is the new review object
            state.reviews.push(action.payload);
        },
        removeReview: (state, action) => {
            // Assuming action.payload is the reviewId to remove
            state.reviews = state.reviews.filter(review => review._id !== action.payload.reviewId);
        },
        updateReview: (state, action) => {
            // Assuming action.payload is the review object with _id to update
            const index = state.reviews.findIndex(review => review._id === action.payload._id);
            if (index !== -1) {
                state.reviews[index] = action.payload;
            }
        }
    }
})
// This slice manages the reviews state in Redux store

// setReviews: Sets the entire reviews array with new data, typically used when fetching reviews from API
// Example: dispatch(setReviews([{id: 1, text: 'Great product'}, {id: 2, text: 'Nice quality'}]))

// addReview: Adds a single new review to the existing reviews array
// Example: dispatch(addReview({id: 3, text: 'Excellent service'}))

// removeReview: Removes a specific review by its ID from the reviews array
// Example: dispatch(removeReview({reviewId: '123'}))

// updateReview: Updates an existing review by finding it via ID and replacing it with new data
// Example: dispatch(updateReview({_id: '123', text: 'Updated review text'}))


export const { setReviews, addReview, removeReview, updateReview } = reviewSlice.actions;
export default reviewSlice.reducer;