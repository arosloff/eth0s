import numpy as np
import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from sklearn.linear_model import LogisticRegression

dataset = pd.read_csv("C:\\users\\jaeso\\Documents\\eth0s\\processed_data.csv")
dataset = dataset.select_dtypes(['number'])
dataset = dataset.drop(["TCP_CONVERSATION_EXCHANGE","DIST_REMOTE_TCP_PORT","REMOTE_IPS","APP_BYTES","SOURCE_APP_PACKETS","REMOTE_APP_PACKETS","SOURCE_APP_PACKETS","APP_PACKETS","SOURCE_APP_BYTES","REMOTE_APP_BYTES","DNS_QUERY_TIMES"], axis=1)
input = dataset.drop(["Type"],axis=1)
output = dataset["Type"]
train_input, test_input, train_output, test_output = train_test_split(input, output, test_size = 0.33,random_state = 10)

clf = LogisticRegression()
clf.fit(train_input,train_output)

coefficients = pd.DataFrame(zip(input.columns,clf.coef_[0]))
coefficients.to_csv("coefficients.csv")

prediction = clf.predict(test_input)
print(accuracy_score(test_output,prediction))
print(clf.score(train_input, train_output))
print(clf.intercept_[0])
#file = open("coefficients.txt",'w')
#for i in clf.coef_[0]:
#    file.write(str(i))
    #file.write("\n")
