import socket, threading

sock = socket.socket()
sock.connect(('127.0.0.1', 22222))

def receiving():
  while True:
    data_in = sock.recv(1024)
    print(data_in.decode('ascii'))

thread = threading.Thread(target=receiving)
thread.start()

while True:
  data = input()
  sock.send(f'Matvey: {data}'.encode('ascii'))