/*
**  Microkernel -- Microkernel for Server Applications
**  Copyright (c) 2015 Ralf S. Engelschall <rse@engelschall.com>
**
**  Permission is hereby granted, free of charge, to any person obtaining
**  a copy of this software and associated documentation files (the
**  "Software"), to deal in the Software without restriction, including
**  without limitation the rights to use, copy, modify, merge, publish,
**  distribute, sublicense, and/or sell copies of the Software, and to
**  permit persons to whom the Software is furnished to do so, subject to
**  the following conditions:
**
**  The above copyright notice and this permission notice shall be included
**  in all copies or substantial portions of the Software.
**
**  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
**  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
**  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
**  IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
**  CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
**  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
**  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

var path = require("path")
var Microkernel = require("../lib/microkernel.js")

describe("Microkernel Library: State", function () {
    it("state() functionality", function (done) {
        var mk = new Microkernel()
        expect(mk).to.respondTo("state")
        mk.load(path.join(__dirname, "sample-load1.js"))
        mk.load(path.join(__dirname, "sample-load2.js"))

        expect(mk.state()).to.be.equal("dead")
        mk.state("running").then(function (state) {
        	expect(state).to.be.equal("running")
            mk.state("dead").then(function (state) {
             	expect(state).to.be.equal("dead")
             	expect(mk.get("load1").log()).to.be.deep.equal([
             	    "boot", "configure", "prepare", "start",
                    "stop", "release", "reset", "shutdown"
                ])
             	done()
            }, function (err) {
            	console.log("ERROR:", err)
        	    done(err)
            })
        }, function (err) {
        	console.log("ERROR:", err)
        	done(err)
        })
    })
})

