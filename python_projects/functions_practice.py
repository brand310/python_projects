# A function named hello() that prints a greeting to the user. This function should accept no arguments and returns nothing.

def hello():
  print("Hello, user!")
  
# A function named pack() that accepts three arguments, and returns a single list with the three arguments inside as list elements.

def pack(a,b,c):
  return [a,b,c]

# A function called eat_lunch(). This function should accept a list of any length, and print out a series of strings that say "First I eat __" 
# (the first element of the list), and "Next I eat ___" (for the following elements in the list). If the list is empty, print "My lunchbox is empty!". 
# The function should not return anything.

def eat_lunch(my_lst):
  if len(my_lst) == 0:
    print("My lunchbox is empty!")
  else:
    for i in range(len(my_lst)):
      if i == 0:
        print(f"First I eat {my_lst[0]}")
      else:
        print(f"Next I eat {my_lst[i]}")

hello()
print(pack("a","b","c"))
print(pack(1,2,3))
eat_lunch([])
eat_lunch(["sandwich"])
eat_lunch(["apple","yogurt","sandwich","water"])