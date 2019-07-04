package aggregator

import (
	"fmt"
	"strconv"

	"gitlab.dusk.network/dusk-core/node-monitor/internal/monitor"
)

func (c *Client) serializeLatency(p *monitor.Param) string {
	err, errFound := p.Data["error"]
	if errFound {
		return err.(string)
	}

	v, er := strconv.ParseFloat(p.Value, 32)
	if er != nil {
		log.WithError(er).Warnln("latency processing reported error")
	}
	if v > 150 {
		return fmt.Sprintf("network too slow. Latency more than 150ms (%sms)", p.Value)
	}

	return ""
}