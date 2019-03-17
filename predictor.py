import numpy as np

def sigmoid(list):
    coefficients = [-0.0327,0.073222,0.000000156,0.003515,-0.3174,0.19397,-0.000064,0.01397,0.05314,0.0000541,0.000526,0.01397,0.011924]
    return 1/(1+np.exp(-np.dot(list,coefficients)-2.5194422395886593))

print(sigmoid([16,6,15087,0,0,0,0,0,0,0,0,0,0]))
