#### Add Table
id: primary
candidate_id: number
rate_similarity: number
ai_remark: Text



![[Demand Candidate Listing.png]]

The demand shortlist are the AI generated recommended candidates for this demand. To save for the cost of OpenAI usage, it should be saved to the database. The user can always regenerate shortlist by clicking the "Generate" button.

The GenAI will use the Behavioral Assessment Result, Skill Assessment Result and History of Project Ratings then execute a sentiment analysis, next is to quantify the response to determine how similar it is based on the requirement of the demand.

The search function is for searching of candidate and also using prompt.

To test, input dummy data to this table to show the list.