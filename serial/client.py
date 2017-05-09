#!/usr/bin/python
import websocket
import json
import serial
import thread
import time

prevTime = 0

def on_message(ws, message):
    connection.write(message.encode())
    #connection.write(b+message)
    print message

def on_error(ws, error):
    print error

def on_close(ws):
    print "Socket connection closed"

def on_open(ws):
    data_rw = ["OpenLabsClient","Connect"]
    data_js = json.dumps(data_rw)
    ws.send(data_js)
    #while True:
        # print 'Am in!!'
        # data_log = connection.readline().decode('ascii')
        # print data_log
    def run(*args):
        valuePair = [None,None]
        while True:
            data_log = connection.readline().strip("\r\n")
            print (data_log)
            try:
                data_val = int(data_log[1:4])
                if valuePair[0] is None:
                    valuePair[0] = data_val
                    send_data(ws, data_log)
                elif valuePair[0] > 500:
                    if valuePair[0] == 1000 and data_val > 500:
                        valuePair[0] = data_val
                        send_data(ws, data_log)
                    elif abs(valuePair[0] - data_val) <= 20:
                        valuePair[0] = 0
                        send_data(ws, data_log)
                else:
                    if valuePair[0] == 0 and data_val < 500:
                        valuePair[0] = data_val
                        send_data(ws, data_log)
                    elif abs(valuePair[0] - data_val) <= 20:
                        valuePair[0] = 1000
                        send_data(ws, data_log)
            except ValueError:
                pass
    thread.start_new_thread(run, ())

    def send_data(ws, data_log):
        global prevTime
        current_time = time.time() * 1000
        if prevTime is 0:
            time_delay = 0
        else:
            time_delay = current_time - prevTime
        prevTime = current_time
        data_log += "T" + str(time_delay)
        data_rw = ["OpenLabsHost", data_log]
        data_js = json.dumps(data_rw)
        ws.send(data_js)
        time.sleep(0.5)

if __name__ == "__main__":
    connection = serial.Serial('/dev/ttyUSB1', baudrate=115200, timeout = 0.5)
    websocket.enableTrace(True)
    ws = websocket.WebSocketApp(
        "ws://107.170.249.214:3131",
        on_open = on_open,
        on_message = on_message,
        on_error = on_error,
        on_close = on_close
    )
    ws.run_forever()