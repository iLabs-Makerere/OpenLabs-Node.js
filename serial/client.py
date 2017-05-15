#!/usr/bin/python
import websocket
import json
import serial
import thread
import time
import json

prevTime = 0
interpolation = 'step'
delay = 2

def find_between( s, first, last ):
    try:
        start = s.index( first ) + len( first )
        end = s.index( last, start )
        return s[start:end]
    except ValueError:
        return ""

def on_message(ws, message):
    global interpolation, delay
    message = json.loads(message)
    connection.write(message[0].encode())
    interpolation = message[1]
    print message[0]
    delay = 200/float(message[0][3:])
    print delay
    print message[1]

def on_error(ws, error):
    print error

def on_close(ws):
    print "Socket connection closed"

def on_open(ws):
    data_rw = ["OpenLabsClient","Connect"]
    data_js = json.dumps(data_rw)
    ws.send(data_js)
    def run(*args):
        valuePair = [None,None]
        prev_log = 0
        while True:
            data_log = connection.readline().strip("\r\n")
            #prev_log = data_log
            print (data_log)
            try:
                if interpolation == 'step':
                    #prev_log[0] = data_log
                    data_val = int(find_between(data_log, 'A', 'B'))
                    if valuePair[0] is None:
                        valuePair[0] = data_val
                        print "data value is None: " + str(data_val)
                        send_data(ws, data_log)
                    elif valuePair[0] > 500:
                        if valuePair[0] == 1000 and data_val > 500:#the previous value was low
                            valuePair[0] = data_val + 5  # some dummy value to get it off 0
                            print "data value is > 500: " + str(data_val)
                            prev_log = data_log
                            send_data(ws, data_log)
                        elif abs(valuePair[0] - data_val) <= 10:#both prev and current are high, set valuePair to 0
                            valuePair[0] = 0
                            print "data value is also > 500: " + str(data_val)
                            send_prevdata(ws, prev_log)
                            #send_data(ws, data_log)
                    else:
                        if valuePair[0] == 0 and data_val < 500:#the previous value was high
                            #valuePair[0] = data_val
                            valuePair[0] = data_val + 5 #some dummy value to get it off 0
                            print "data value is < 500: " + str(data_val)
                            prev_log = data_log
                            send_data(ws, data_log)
                        elif abs(valuePair[0] - data_val) <= 10:#both prev and current are low, set valuePair to 1000
                            valuePair[0] = 1000
                            print "data value is also < 500: " + str(data_val)
                            send_prevdata(ws, prev_log)
                            #send_data(ws, data_log)
                    print "difference is : " + str(abs(valuePair[0] - data_val))
                if interpolation == 'bezier':
                    data_val = int(find_between(data_log, 'A', 'B'))
                    if valuePair[0] is None:
                        valuePair[0] = data_val
                        send_data(ws, data_log)
                    elif valuePair[0] > 600 and data_val < 500:
                        #if valuePair[0] < 1000 and data_val > 500:
                        valuePair[0] = data_val
                        send_data(ws, data_log)
                    elif valuePair[0] < 400 and data_val > 500:
                        valuePair[0] = data_val
                        send_data(ws, data_log)
                    else:
                        pass

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
        time.sleep(delay)

    def send_prevdata(ws, prev_log):
        global prevTime
        current_time = time.time() * 1000
        if prevTime is 0:
            time_delay = 0
        else:
            time_delay = current_time - prevTime
        prevTime = current_time
        prev_log += "T" + str(time_delay)
        data_rw = ["OpenLabsHost", prev_log]
        data_js = json.dumps(data_rw)
        ws.send(data_js)
        time.sleep(delay)

if __name__ == "__main__":
    connection = serial.Serial('/dev/ttyUSB0', baudrate=115200, timeout = 0.5)
    websocket.enableTrace(True)
    ws = websocket.WebSocketApp(
        "ws://107.170.249.214:3131",
        on_open = on_open,
        on_message = on_message,
        on_error = on_error,
        on_close = on_close
    )
    ws.run_forever()